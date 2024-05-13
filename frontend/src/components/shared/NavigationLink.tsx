import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  OnClick?: () => Promise<void>;
};

function NavigationLink(props: Props) {
  return (
    <Link
      className="font-semibold uppercase mx-4 px-4 py-2 rounded-full tracking-widest"
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
}

export default NavigationLink;
