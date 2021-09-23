declare type PropsTypes = {
    data: any[];
    renderItem: (data: any) => JSX.Element;
    onSwipe: (currentIndex: number) => void;
    stackSpacing?: number;
    swipeThreshold?: number;
    swipeDuration?: number;
};
declare const FlatSwipeStack: ({ data, renderItem, onSwipe, stackSpacing, swipeThreshold, swipeDuration, }: PropsTypes) => JSX.Element;
export default FlatSwipeStack;
