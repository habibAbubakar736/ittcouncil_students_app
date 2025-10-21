const TableRows = (props) => {
    return (
        Array.from({ length: props.rows }, (_, i) => (
            <tr key={i} className="shimmer">
                <td colSpan={props.colspan} ><span style={{ visibility: 'hidden' }}>Test</span></td>
            </tr>
        ))
    );
}

const NoRecords = () => {
    return (
        <tr>
            <td colSpan={10}>
                <div className="noresult" style={{ display: 'block', width: '100%' }}>
                    <div className="text-center">
                        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: '75px', height: '75px' }} />
                        <h5 className="mt-2">Sorry! No Result Found</h5>
                    </div>
                </div>
            </td>
        </tr>
    );
}


const TimeFormater = (datetimeString) => {
    if (!datetimeString) {
        return "";
    }
    var timeString = datetimeString?.split(' ')[1];
    if (timeString) {
        var timeComponents = timeString?.split(':');
        var hours = parseInt(timeComponents[0]);
        var minutes = parseInt(timeComponents[1]);
        var meridiem = (hours < 12) ? 'AM' : 'PM';
        hours = (hours % 12 === 0) ? 12 : hours % 12;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var formattedTime = hours + ':' + minutes + ' ' + meridiem;
        return formattedTime;
    }
    else {
        timeString = datetimeString?.split('T')[1];
        var timeComponents = timeString?.split(':');
        var hours = parseInt(timeComponents[0]);
        var minutes = parseInt(timeComponents[1]);
        var meridiem = (hours < 12) ? 'AM' : 'PM';
        hours = (hours % 12 === 0) ? 12 : hours % 12;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var formattedTime = hours + ':' + minutes + ' ' + meridiem;
        return formattedTime;
    }
}

const DateFormater = (GettedDate) => {
    if (!GettedDate) {
        return ` `;
    }

    const date = new Date(GettedDate);
    if (isNaN(date.getTime())) {
        return ` `;
    }

    // Array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Return the formatted date string, with padded day
    return `${day.toString().padStart(2, '0')}-${month}-${year}`;
}

export { TableRows, NoRecords, TimeFormater, DateFormater }