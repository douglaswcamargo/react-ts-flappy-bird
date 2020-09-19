import styled from 'styled-components'

export const Screen = styled.div`
  cursor: pointer;
    & canvas {
        box-shadow: 0 1px 1px rgba(0,0,0,0.08), 
                    0 2px 2px rgba(0,0,0,0.12), 
                    0 4px 4px rgba(0,0,0,0.16), 
                    0 8px 8px rgba(0,0,0,0.20);
        border-radius: 8px;
  }
`
