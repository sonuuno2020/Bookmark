import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useActiveTab = (firstTab) => {
  const query = useQuery();
  const activeTab = query.get('tab') ? query.get('tab') : firstTab;
  return activeTab;
}

export default useActiveTab;