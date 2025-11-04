

export const TableFooter = ({ prev, loading, totalRecords, total_pages, page, next, setPage }) => {

    const handlePrev = () => {
        if (prev === true) {
            setPage((prevPage) => {
                const newPage = prevPage - 1;
                return newPage;
            });
        }
    };

    const handleNext = () => {
        if (next === true) {
            setPage((prevPage) => {
                const newPage = prevPage + 1;
                return newPage;
            });
        }
    };

    const handleChange = (e) => {
        const newPage = parseInt(e.target.value, 10);
        setPage(newPage);
    };

    return (
        <tfoot className='table-light'>
            <tr>
                <th colSpan={15}>
                    <div className='d-flex justify-content-between'>
                        <button
                            disabled={prev === false && loading === false ? true : false}
                            type='button'
                            onClick={handlePrev}
                            className={`btn btn-warning btn-label waves-effect waves-light`}>
                            <i className='ri-arrow-left-line label-icon align-middle fs-16 me-2' /> Previous
                        </button>
                        <div
                            className='col-md-4'
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <small>
                                Total Records: {totalRecords} | Total Pages: {total_pages} | Current Page: {page}
                            </small>
                        </div>

                        <div className='col-md-2'>
                            <select className='form-select' onChange={handleChange}>
                                {Array.from({ length: total_pages }, (_, i) => (
                                    <option selected={page === i + 1} key={i} value={i + 1}>
                                        Page {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            disabled={next === false && loading === false ? true : false}
                            type='button'
                            onClick={handleNext}
                            className={`btn btn-success btn-label waves-effect right waves-light`}>
                            <i className='ri-arrow-right-line label-icon align-middle fs-16 ms-2' /> Next
                        </button>
                    </div>
                </th>
            </tr>
        </tfoot>
    )
}