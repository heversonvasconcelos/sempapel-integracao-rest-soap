export function isEmpty(value) {
    return (!value || (typeof value === 'string' && (value.startsWith('undefined') || value.trim().length === 0)));
}