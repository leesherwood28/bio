interface StackCollectionParams {
  children: React.ReactNode;
}
const StackCollection: React.FunctionComponent<StackCollectionParams> = ({
  children,
}) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl'>Stack</span>
      <div className='flex flex-wrap mb-8 justify-center gap-4'>{children}</div>
    </div>
  );
};

export default StackCollection;
