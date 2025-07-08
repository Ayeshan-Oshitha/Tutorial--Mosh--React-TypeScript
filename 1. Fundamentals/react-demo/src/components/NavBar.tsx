interface Props {
  cardItemsCount: number;
}

const NavBar = ({ cardItemsCount }: Props) => {
  return (
    <>
      <div>NavBar</div>
      <p>{cardItemsCount}</p>
    </>
  );
};

export default NavBar;
