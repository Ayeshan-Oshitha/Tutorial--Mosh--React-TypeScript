import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

interface Props {
  onClick: () => void;
}
const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) {
    return <FaHeart color="#ff6b81" size={40} onClick={toggle} />;
  } else {
    return <CiHeart color="#ff6b81" size={40} onClick={toggle} />;
  }
};

export default Like;
