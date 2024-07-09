function useMemo(callback, dependencies) {
  const [res, setState] = useState();
  useEffect(() => {
    const val = callback();
    setState(val);
  }, dependencies);
  return res;
}

const memo = useMemo(() => {
  return 1;
}, []);
