// Returns the input value matching the viewport.
const viewportMatchingValue = (sm, md, lg, xl) => {
    switch(window.screen.width) {
        case 601: return md;
        case 1024: return lg;
        case 1920: return xl;
        default: return sm
    }
}

export {
    viewportMatchingValue
}