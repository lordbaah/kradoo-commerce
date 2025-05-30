import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Kradoo`;
  }, [title]);
};

export default useDocumentTitle;
