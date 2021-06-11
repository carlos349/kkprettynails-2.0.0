const formatPrice = {}

formatPrice.install = (Vue) => {
    Vue.filter('formatPrice', (value) => {
        let val = (value/1).toFixed(2).replace('.', ',')
        return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    })
}

export default formatPrice