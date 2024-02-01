type IconProps = React.HTMLAttributes<SVGElement>;

const Logo = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path
      fill="#1E88E5"
      d="M8 0C3.582 0 0 3.316 0 7.407c0 2.331 1.163 4.41 2.981 5.768V16l2.724-1.495c.727.201 1.497.31 2.295.31 4.418 0 8-3.316 8-7.407C16 3.316 12.418 0 8 0z"
    />
    <path
      fill="#FAFAFA"
      d="M8.795 9.975 6.758 7.802 2.783 9.975l4.372-4.642 2.087 2.173 3.926-2.173z"
    />
  </svg>
);
export default Logo;
