import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UsersPage from './UsersPage';
import PropertiesPage from './PropertiesPage';
import CalendarPage from './CalendarPage';
import SwapsPage from './SwapsPage';
import ModerationPage from './ModerationPage';

const AdminPanel = () => (
  <div>
    <h1>Bayhan Admin Panel</h1>
    <nav>
      <Link to="users">Пользователи</Link> | 
      <Link to="properties">Объекты</Link> | 
      <Link to="calendar">Календари</Link> | 
      <Link to="swaps">Обмены</Link> | 
      <Link to="moderation">Модерация</Link>
    </nav>
    <Routes>
      <Route path="users" element={<UsersPage />} />
      <Route path="properties" element={<PropertiesPage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="swaps" element={<SwapsPage />} />
      <Route path="moderation" element={<ModerationPage />} />
    </Routes>
  </div>
);

export default AdminPanel;