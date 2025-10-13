import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Dashboard/Sidebar';
import Header from './components/Dashboard/Header';

import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Leads from './pages/Leads';
import Users from './pages/Users';
import Messages from './pages/Messages';
import Proposals from './pages/Proposals';
import Whiteboards from './pages/Whiteboards';
import Document from './pages/Document';
import Knowledgebase from './pages/Knowledgebase';
import FetchLeads from './pages/FetchLeads';
import Creates from './pages/Creates';
import Clips from './pages/Clips';
import Support from './pages/Support';
import DownloadPage from './pages/DownloadPage';
import CreateWhiteboard from './pages/CreateWhiteboard'; // ✅ Correct import
import NewDocumentPage from './pages/NewDocumentPage';
import Test from './pages/Test';


const Layout = () => {
  const location = useLocation();
  const hideLayout = ['/create-whiteboard', '/new-document'].includes(location.pathname);


  return (
    <div className="flex h-screen bg-black font-sans">
      {!hideLayout && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-auto custom-scrollbar">
        {!hideLayout && <Header />}

        <main className={`flex-1 ${!hideLayout ? 'w-[95%] mx-auto' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/users" element={<Users />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/clips" element={<Clips />} />
            <Route path="/whiteboards" element={<Whiteboards />} />
            <Route path="/document" element={<Document />} />
            <Route path="/support" element={<Support />} />
            <Route path="/knowledgebase" element={<Knowledgebase />} />
            <Route path="/fetch-leads" element={<FetchLeads />} />
            <Route path="/create" element={<Creates />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/create-whiteboard" element={<CreateWhiteboard />} /> {/* ✅ */}
            <Route path="/new-document" element={<NewDocumentPage />} /> {/* ✅ */}
            {/* <Route path="/new-test" element={<Test />} />  */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
