

/**
 * Displays animated loading dots
 *
 * @param bgColor - Background color of the dots
 * @param dotWidth - Width of each dot
 * @param dotHeight - Height of each dot
 * @param containerHeight - Height of the container
 * @param dataTestID - Test ID for the component
 * @returns A JSX element displaying animated loading dots
 */
const DotLoader = ({
    bgColor = "bg-gray-500",
    dotWidth = "w-2",
    dotHeight = "h-2",
    containerHeight = "h-5",
    dataTestID = "dot-loader",
}: {
    bgColor?: string;
    dotWidth?: string;
    dotHeight?: string;
    containerHeight?: string;
    dataTestID?: string;
}) => {
    return (
        <div data-testid={dataTestID} className={`loading-dots ${containerHeight}`}>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
            <div className={`dot ${bgColor} ${dotWidth} ${dotHeight}`}></div>
        </div>
    );
};

export default DotLoader;
