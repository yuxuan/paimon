'use client';

import {Application} from '@/shared/structure';
import {ReactNode, createContext, useContext, useMemo, useState} from 'react';
import {noop} from 'lodash';

interface ApplicationContext {
  application: Application;
  conversationId: string | null;
  setContextConversationId: typeof noop;
}

const ApplicationContext = createContext<ApplicationContext>({
  application: null as unknown as Application, // must exist
  conversationId: null,
  setContextConversationId: noop,
});

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({
  application,
  children,
}: {
  application: Application;
  children: ReactNode;
}) => {
  const [conversationIdContext, setContextConversationId] = useState(null);
  const context = useMemo(
    () => ({
      application: application,
      conversationId: conversationIdContext,
      setContextConversationId,
    }),
    [application, conversationIdContext]
  );
  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  );
};
