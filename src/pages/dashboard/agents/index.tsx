import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { PATH_AFTER_LOGIN_AGENT } from '../../../config';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    console.log(PATH_DASHBOARD.root_agent)
    if (pathname === PATH_DASHBOARD.root_agent) {
        
      replace(PATH_AFTER_LOGIN_AGENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN_AGENT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
