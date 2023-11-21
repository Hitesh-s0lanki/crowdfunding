import {CirclesWithBar} from "react-loader-spinner";

const Loading = ({
    visible
}) => {
    return ( 
        <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={visible}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel='circles-with-bar-loading'
        />
    );
}
 
export default Loading;