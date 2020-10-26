import React from 'react';
import { useDragLayer } from 'react-dnd';
import IngredientsPreview from './ingredientsPreview';
import UtensilPreview from './utensilPreview';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};
function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}
function CustomDragLayer() {
    const { itemType, isDragging, item, initialOffset, currentOffset, } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));
    function renderItem() {
        switch (itemType) {
            case 'INGREDIENTS':
                return <IngredientsPreview ingredients={{
                    ...item,
                    isDragging
                }} />;
            case 'UTENSILS':
                return <UtensilPreview utensil={{
                    ...item,
                    isDragging
                }} />;
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div>
    );
}

export default CustomDragLayer;