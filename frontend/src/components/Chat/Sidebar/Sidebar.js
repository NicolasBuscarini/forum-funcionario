import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Sidebar.css'; // Crie um arquivo CSS para os estilos

const Sidebar = ({ chats, users, onChatSelect, onReorderChats }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedChats = Array.from(chats);
    const [removed] = reorderedChats.splice(result.source.index, 1);
    reorderedChats.splice(result.destination.index, 0, removed);
    onReorderChats(reorderedChats);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <nav className="people-list col-md-3 sidebar" ref={provided.innerRef} {...provided.droppableProps}>
            <h4 className="text-center mt-3">Meus Chats</h4>
            <div className="search">
              <input type="text" placeholder="Pesquisar..." />
            </div>
            <ul className="list-group">
              {chats.map((chat, index) => (
                <Draggable key={chat.chatId} draggableId={chat.chatId} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="chat-item list-group-item"
                      onClick={() => onChatSelect(chat.chatId, chat.name)}
                    >
                      <img
                        src={users[chat.chatId]?.photo}
                        alt={chat.name}
                        className="user-photo"
                      />
                      <span>{chat.name}</span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </nav>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Sidebar;
