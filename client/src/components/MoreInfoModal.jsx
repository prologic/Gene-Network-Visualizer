import React from 'react';
import axios from "axios";
import CategoricalSearch from './CategoricalSearch';
import {CSVLink} from "react-csv";
import { useStore } from 'react-context-hook';
import { Modal, Header, Button, List, Accordion, Icon, Grid } from 'semantic-ui-react';
import Table from './Table.jsx'

let endpoint = "http://localhost:8080";

/**
* MoreInfo Modal, providing formatted details
* on a single database entry.
*
* We can get here via the main table or
* clicking a node => more info on the graph
*
* @param {Object} moreInfoGene (FROM STORE) Targetted Gene to detail with modal
* @param {Array} previewGenes (FROM STORE) Genes to show in preview table inside of modal
* @param {boolean} gnDrop (FROM STORE) dropdown for multiple gene_names property
* @param {boolean} tiDrop (FROM STORE) dropdown for term_ids property
* @returns {Object} Modal detailing information about a single Gene
*/
function MoreInfoModal() {
  // MoreInfoGene is the selected gene of interest
  const [moreInfoGene] = useStore('moreInfoGene');
  const [moreInfoVisible, setMoreInfoVisible] = useStore('moreInfoVisible');
  const [previewGenes] = useStore('previewGenes');
  const [previewRowsPerPage] = useStore('previewRowsPerPage');
  const [gnDrop, setGnDrop] = useStore('gnDrop');
  const [tiDrop, setTiDrop] = useStore('tiDrop');

// There's usually many Gene names
  let geneNames = moreInfoGene.gene_names.map(name =>{
    return(
      <List.Item>
        <List.Content>
          <List.Header>
            {name}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  })

// Same with GoTerms
  let goTerms = moreInfoGene.term_ids.map(term_id =>{
    return(
      <List.Item>
        <List.Content>
          <List.Header>
            {term_id}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  })

// If we have a gene of interest and this modal is supposed to be visible..
// Render (conditional rendering)
  return ( (moreInfoGene != null && moreInfoVisible) &&
  <Modal dimmer={'blurring'} open={moreInfoVisible}>
    {{moreInfoVisible} &&
      <Modal.Content>

        {/* <Image wrapped size='medium' src='https://i.imgur.com/jXy3wuV.png' /> */}
        <Modal.Description>

          <Header>
            <h1>
              {moreInfoGene.gene_display_name}
            </h1>
          </Header>
          <h1>Description:</h1>
          <h3 style={{color:"gray"}}>{moreInfoGene.description}</h3>

          <h1>Species:{moreInfoGene.species}</h1>

          <Accordion exclusive={false}>
            <Accordion.Title active={gnDrop===true} onClick={()=>setGnDrop(!gnDrop)}>
              <h1>Gene Names <Icon name='dropdown'/></h1>

            </Accordion.Title>
            <Accordion.Content active={gnDrop===true}>
              <List divided relaxed>
                {geneNames}
              </List>
            </Accordion.Content>

            <Accordion.Title active={tiDrop===true} onClick={()=>setTiDrop(!tiDrop)}>
              <h1>Term ids <Icon name='dropdown'/></h1>

            </Accordion.Title>
            <Accordion.Content active={tiDrop===true}>
              <List divided relaxed>
                {goTerms}
              </List>
            </Accordion.Content>

          </Accordion>

          <Grid centered divided columns={2}>
            <Grid.Column textAlign='center'>
              <h3>Download Table</h3>
              <CSVLink data={previewGenes}>
                <Button icon  labelPosition='left'>
                  <Icon name='download'/>

                  Export
                </Button>
              </CSVLink>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <h3>Search Fields</h3>
              <CategoricalSearch genes={previewGenes}/>
            </Grid.Column>
          </Grid>

          <h1>Search Preview

          </h1>


            <Table data={previewGenes}
              rowsPerPage={previewRowsPerPage}
              isPreview={true}/>

        </Modal.Description>
        {/* Many functions are inlined / interweaved as so */}
        <Button onClick={() => setMoreInfoVisible(!moreInfoVisible)}>Close</Button>
      </Modal.Content>
    }
  </Modal>)
}

export default MoreInfoModal;
