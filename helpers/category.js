function getCategoriesList(categories, parentId = null) {
    const categoriesList = [];
    let category;

    if (parentId === null) {
        category = categories.filter(
            (category) => category.parentId == undefined
        );
    } else {
        category = categories.filter(
            (category) => category.parentId == parentId
        );
    }

    for (const cat of category) {
        categoriesList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: getCategoriesList(categories, cat._id),
        });
    }

    return categoriesList;
}

module.exports = getCategoriesList;
