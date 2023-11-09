import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const MenuCategory = ({ items }) => {
    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 mb-8">
                {
                    items.map(item => <MenuItem
                        key={item.id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;