import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Peginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
    const renderPageButtons = () => {
        const buttons = [];

 
        buttons.push(
            <Button
                key={1}
                onClick={() => setPage(1)}
                active={page === 1}
                className={`mx-1 ${page === 1 ? 'pegination_active_page' : 'pegination_deactive_page'}`}
            >
                1
            </Button>
        );

   
        if (page > 3) {
            buttons.push(
                <Button
                    key="left-ellipsis"
                    disabled
                    className="mx-1 pegination_dots"
                >
                    ...
                </Button>
            );
        }

 
        for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
            buttons.push(
                <Button
                    key={i}
                    onClick={() => setPage(i)}
                    active={page === i}
                    className={`mx-1 ${page === i ? 'pegination_active_page' : 'pegination_deactive_page'}`}
                >
                    {i}
                </Button>
            );
        }

     
        if (page < pageCount - 2) {
            buttons.push(
                <Button
                    key="right-ellipsis"
                    disabled
                    className="mx-1 pegination_dots"
                >
                    ...
                </Button>
            );
        }

      
        if (pageCount > 1) {
            buttons.push(
                <Button
                    key={pageCount}
                    onClick={() => setPage(pageCount)}
                    active={page === pageCount}
                    className={`mx-1 ${page === pageCount ? 'pegination_active_page' : 'pegination_deactive_page'}`}
                >
                    {pageCount}
                </Button>
            );
        }
        return buttons;
    };

    return (
        <div className="d-flex justify-content-center pegination_container">
            {pageCount > 0 && (
                <ButtonGroup aria-label="Pagination">
                    <Button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className="mx-1 pegination_left_btn"
                    >
                        {'<<  <'}
                    </Button>
                    {renderPageButtons()}
                    <Button
                        onClick={handleNext}
                        disabled={page === pageCount}
                      
                        className="mx-1 pegination_left_btn"
                    >
                        {'>  >>'} 
                    </Button>
                </ButtonGroup>
            )}
        </div>
    );
};

export default Peginations;
