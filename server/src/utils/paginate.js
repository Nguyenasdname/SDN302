
exports.paginateQuery = async (model, query,
    {
        page = 1,
        limit = 10,
        sort = { createDate: -1 },
        populate = '',
        projection = null
    }) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query, projection).sort(sort).skip(skip).limit(limit).populate(populate),
        model.countDocuments(query),
    ]);

    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
}

