import React, { useEffect } from "react";
import { updateUserEmailState } from "../../../../redux/user/actions";
import { useStoreValue } from "../../../../redux/store";

export default function VerifyEmail(props) {
  const [, dispatch] = useStoreValue();

  console.log(props);
  const verifyEmail = async () => {
    const { userId } = props.match.params;
    const { search } = props.location;
    const hash = search.replace("?h=", "");

    await updateUserEmailState({ userId, hash }, dispatch);
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return <div>Successfully verify email</div>;
}
