import React from "react";

function FilterPanel() {
    return (
        <div className="filter-panel">
            <div className="filter-panel__category">
                <h2>Category</h2>
                <div className="filter-panel__category-box">
                    <input type="checkbox" id="category1" name="category1" value="category1" />
                    <label htmlFor="category1">Category1</label>

                    <input type="checkbox" id="category2" name="category2" value="category2" />
                    <label htmlFor="category2">Category2</label>

                    <input type="checkbox" id="category3" name="category3" value="category3" />
                    <label htmlFor="category3">Category3</label>

                    <input type="checkbox" id="category4" name="category4" value="category4" />
                    <label htmlFor="category4">Category4</label>

                    <input type="checkbox" id="category5" name="category5" value="category5" />
                    <label htmlFor="category5">Category5</label>
                </div>
            </div>
            <div className="filter-panel__price">
                <h2>Price</h2>
                <div className="filter-panel__price-box">
                    <input type="text" id="price" name="price1" value="price1" readOnly={true}/>
                    <label htmlFor="price">Price1</label>
                </div>
            </div>
        </div>
    );

}
export default FilterPanel;