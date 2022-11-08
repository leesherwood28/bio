interface StackChipParams {
  text: string;
}
const StackChip: React.FunctionComponent<StackChipParams> = ({ text }) => {
  return <div className='bg-white text-black rounded-full px-2 '>{text}</div>;
};

export default StackChip;
