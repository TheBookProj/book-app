import './App.css';
import SearchBooks from './components/SearchBooks/SearchBooks';
import BookDetails from './components/BookDetails/BookDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { AuthProvider } from './firebase/authContext';
import { ChatClientProvider } from './agora/ChatClientContext';
import { Chat, UIKitProvider } from 'agora-chat-uikit';

function App() {
  const appKey = "411341302#1546139"

  return (
    <div className="App">
      <Router>
        <AuthProvider> 
          <UIKitProvider
              initConfig={{
                  appKey: appKey,
                  userId: 'hello',
                  token: '007eJxTYHj2/mR4h9l0qyd3I5esUlaumBbJ3b5EMvTWNZMbByJM9yxXYDBPNkxNSkxLMzQwMjYxMrW0NDYzs0yzTLG0MLEwtkg1K67Qy2gIZGSI23uchZGBlYERCEF8FYaUlDRTsxQjA11js0QLXUPDNANdC/MkM900S1OjZPO0FAtjkyQA0yIn8A==',
                  translationTargetLanguage: 'fr',
                  useUserInfo: true,
              }}
              local={{
                  fallbackLng: 'en',
                  lng: 'en',
                  resources: {
                  en: {
                      translation: {
                      'conversationTitle': 'Conversation List',
                      'deleteCvs': 'Delete Conversation',
                      // ...
                      },
                  },
                  },
              }}
              theme={{
                  primaryColor: '#33ffaa',
                  mode: 'light',
                  componentsShape: 'square'
              }}
              reactionConfig={{
                  map: {
                      'emoji_1': <img src={'customIcon'} alt={'emoji_1'} />,
                      'emoji_2': <img src={'customIcon'} alt={'emoji_2'} />,
                  }
              }}

              features={{
                  conversationList: {
                  // search: false,
                  item: {
                      moreAction: false,
                      deleteConversation: false,
                  },
                  },
                  chat: {
                  header: {
                      threadList: true,
                      moreAction: true,
                      clearMessage: true,
                      deleteConversation: false,
                      audioCall: false,
                  },
                  message: {
                      status: false,
                      reaction: true,
                      thread: true,
                      recall: true,
                      translate: false,
                      edit: false,
                  },
                  messageEditor: {
                      mention: false,
                      typing: false,
                      record: true,
                      emoji: false,
                      moreAction: true,
                      picture: true,
                  },
                  },
              }}
          >
            <ChatClientProvider>
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/book-details" element={<BookDetails />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/home" element={<SearchBooks />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </ChatClientProvider>
          </UIKitProvider>
        </AuthProvider>
      </Router>
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
