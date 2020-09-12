
const Router = require('koa-router');
const axios = require('axios');
// fs在内存中
// const MemoryFs = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');

const serverRender = require('./server-render-no-bundle');
const serverConfig = require('../../build/webpack.config.server.js');

const NativeModule = require('module');
const Vm = require('vm');

const serverCompiler = webpack(serverConfig);
// const mfs = new MemoryFs();

// serverCompiler.outputFileSystem = mfs

let bundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        throw err;
    }
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn =>  console.warn(warn))

    const bundlePath = path.join(serverConfig.output.path, 'server-entry.js');

    delete require.cache[bundlePath];
    bundle = require('../../server-build/server-entry.js').default;

    // try {
    //     const m = { exports: {} };
    //     const bundleStr = mfs.readFileSync(bundlePath, 'utf-8');
    //     // bundleStr为字符串代码，需要通过nodejs执行原理去执行，得到bundle
    //     // function (module, exports, require)
    //     const wrapper = NativeModule.wrap(bundleStr);
    //     const script = new Vm.Script(wrapper, {
    //         filename: 'server-entry.js',
    //         displayErrors: true,
    //     });
    //     // script 运行需要一个this上下文
    //     const result = script.runInThisContext();
    //     result.call(m.exports, m.exports, require, m);
    //     // 获取打包到的bundle
    //     bundle = m.exports.default;

    // } catch(err) {
    //     console.error('compiler js error:', err)
    // }

    // bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log('new bundle generated');
})

const handleSSR = async (ctx, next) => {
    if (!bundle) {
        ctx.body = '你等一会，别着急......';
        return;
    }
    const clientServerUrl = 'http://127.0.0.1:8080/vue-ssr-client-manifest.json';
    const clientManifestResp = await axios.get(clientServerUrl);
    const clientManifest = clientManifestResp.data;

    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs'),
        'utf-8'
    )

    const renderer = VueServerRenderer.createRenderer({
        inject: false,
        clientManifest
    });

    await serverRender(ctx, renderer, template, bundle);
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router

