import React from 'react';
import styled from 'styled-components';

const List = styled.div``;
const ListItem = styled.div`
  margin-bottom: 10px;
`;

const TechnologyList = ({ technologies, onUpdate, onRemove }) => {
  return (
	<List>
	  {technologies.map((tech) => (
		<ListItem key={tech.id}>
		  <span>{tech.name} - {tech.description}</span>
		  <button onClick={() => onUpdate(tech.id, tech)}>Update</button>
		  <button onClick={() => onRemove(tech.id)}>Remove</button>
		</ListItem>
	  ))}
	</List>
  );
};

export default TechnologyList;
