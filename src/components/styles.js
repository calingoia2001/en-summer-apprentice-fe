/* eslint-disable semi */
/* eslint-disable indent */
const styles = {
    addToCartBtn: [
        'add-to-cart-btn',
        'px-2',
        'py-1',
        'rounded',
        'text-black',
        'font-italic',
        'focus:outline-none',
        'focus:shadow-outline'
      ],
      input: [
        'w-16',
        'text-center',
        'border',
        'border-gray-300',
        'rounded',
        'py-2',
        'px-3',
        'text-gray-700',
        'focus:outline-none',
        'focus:shadow-outline'
      ]
}

export function useStyle (type) {
    if (typeof type === 'string') return styles[type];
    else {
      const allStyles = type.map((t) => styles[t]);
      return allStyles.flat();
    }
}
