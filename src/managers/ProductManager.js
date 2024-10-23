class ProductManager {
    constructor() {
    }

    async getProducts(filters, options) {
        const { limit, page, sort } = options;
        const skip = (page - 1) * limit;

        return await Product.find(filters)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .exec();
    }

    async countProducts(filters) {
        return await Product.countDocuments(filters);
    }
}

module.exports = ProductManager;
