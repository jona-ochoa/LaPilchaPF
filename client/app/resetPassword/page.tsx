import React from "react";
import ResetPassword from "../../components/ResetPassword"

const ResetPasswordPage = ({token}) => {
    return (
        <div>
            <ResetPassword token={token}/>
        </div>
    )
}

export const getServerSideProps = async(context) => {
    const token = context.query.token || null;
    return {
        props: {
            token,
        }
    }
}

export default ResetPasswordPage;