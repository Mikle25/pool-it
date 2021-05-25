import styled from 'styled-components';
import { FormGroup as BFormGroup } from 'react-bootstrap';

const FormSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FormGroup = styled(BFormGroup)`
  display: flex;
  flex-direction: column;
`;

export { FormGroup, FormSubmit };
