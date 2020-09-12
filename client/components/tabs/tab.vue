
<script>
export default {
    name: 'Tab',
    props: {
        index:{
            required: true,
            type: [Number, String]
        },
        label: {
            type: String,
            default: 'tab'
        }
    },
    inject: ['parentData'],
    computed: {
        active() {
            return this.parentData.value === this.index
        }
    },
    methods: {
        handleClick() {
            this.$parent.onChange(this.index);
        }
    },
    mounted () {
        this.$parent.panes.push(this)
    },
    render() {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
            tab: true,
            active: this.active
        }
        return <li
            class={classNames}
            onClick={this.handleClick}>
            {tab}
        </li>
    }
}
</script>

<style lang="less" scoped>
.tab {
    list-style: none;
    line-height: 40px;
    margin-right: 30px;
    position: relative;
    bottom: -2px;
    cursor: pointer;
    &.active {
        border-bottom: 2px solid blue;
    }
    &:last-child {
        margin-right: 0;
    }

}


</style>
