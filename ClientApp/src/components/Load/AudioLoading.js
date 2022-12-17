
import { memo } from "react"
import { RotatingLines } from "react-loader-spinner"

const AudioLoading = () => {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="22"
            visible={true}
        />
    )
}

export default memo(AudioLoading)