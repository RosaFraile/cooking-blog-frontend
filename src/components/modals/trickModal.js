import React, { Component } from 'react';
import ReactModal from 'react-modal';

import TrickForm from '../tricks/trickForm';

ReactModal.setAppElement(".app-wrapper");

export default class TrickModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "800px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.75)"
            }
        }

        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    handleUpdateFormSubmission() {
        this.setState({
            trickModalIsOpen: false
        })
        this.props.handleUpdateFormSubmission();
    }

    handleCloseModal() {
        this.setState({
          trickModalIsOpen: false
        })
      }

    render() {
        return (
            <ReactModal
                style={this.customStyles}
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}
                isOpen={this.props.modalIsOpen} >
                <TrickForm
                    handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                    editMode={this.props.editMode}
                    trickToEdit={this.props.trickToEdit}
                />
            </ReactModal>
        )
    }
}