import { memo } from 'react';
import { Oval } from 'react-loader-spinner';
const Loading = () => {
    return (
        <div className="Loading flex w-full justify-center">
            <Oval
                height={14}
                width={14}
                color="rgba(0,0,0,0.3)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="rgba(0,0,0,0.3)"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default memo(Loading);
