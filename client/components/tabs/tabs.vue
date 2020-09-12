
<script>
import TabContainer from './tab-container.vue'
export default {
    name: 'Tabs',
    components: {
        TabContainer
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        }
    },
    provide() {
        const parentData = {};
        Object.defineProperty(parentData, 'value', {
            get: () => this.value,
            enumerable: true
        })
        return {
            parentData
        }
    },
    data() {
        return {
            panes: []
        }
    },
    render() {
        return <div class="tabs">
            <ul class="tabs-header">
                {this.$slots.default}
            </ul>
            <tab-container panes={[...this.panes]} />
        </div>
    },
    methods: {
        onChange(index) {
            this.$emit('change', index)
        }
    }
}
</script>
<style lang="less" scoped>
.tabs-header {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #ededed;
}
</style>
