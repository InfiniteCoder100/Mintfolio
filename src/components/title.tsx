interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-3xl mb-5 font-bold title-font text-transparent bg-clip-text bg-gradient-to-r from-[#a13bf7] to-[#732fff]">
        {title}
      </h1>
    </div>
  );
};

export default Title;

Title.defaultProps = {
  label: "",
  onClick: () => {},
};
