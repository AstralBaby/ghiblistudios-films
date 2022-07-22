const Rating = () => {
    const HalfStar = () => <i class='bx bxs-star-half' ></i>
    const filledStar = () => <i class='bx bxs-star' ></i>
    const EmptyStar = () => <i class='bx bx-star' ></i>

    switch (total) {
        case 0:
            return <EmptyStar /> * 5
            break;
    
        default:
            break;
    }
}