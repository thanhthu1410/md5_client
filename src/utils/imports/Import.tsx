const ImportFunc = (importFunc: any) => {
    const Component = importFunc()
  
    return () => (
      <Component/>
    );
  };
  
  export default ImportFunc;