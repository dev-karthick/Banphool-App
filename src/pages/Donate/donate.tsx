
const donations = [
    {
        name: "Rahul Kumar",
        amount: "₹5,000",
        purpose: "Education",
        date: "05 Aug 2026",
        status: "Completed",
        color: "success",
    },
    {
        name: "Priya Sharma",
        amount: "₹2,500",
        purpose: "Medical",
        date: "04 Aug 2026",
        status: "Pending",
        color: "warning",
    },
    {
        name: "Arun Kumar",
        amount: "₹10,000",
        purpose: "Food Support",
        date: "03 Aug 2026",
        status: "Completed",
        color: "success",
    },
];

export default function Donate() {
    return (
        <div className="p-4">
            <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h5 className="fw-bold mb-1">Recent Donations</h5>
                            <p className="text-muted mb-0">
                                Latest donations received by the foundation
                            </p>
                        </div>

                        <button className="btn btn-success rounded-pill px-4">
                            View All
                        </button>
                    </div>
                    <hr/>
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle table-hover mb-0">
                            <thead>
                                <tr>
                                    <th className="border-0" style={{ backgroundColor: "#25473C", color: "#fff" }}>Donor</th>
                                    <th className="border-0" style={{ backgroundColor: "#25473C", color: "#fff" }}>Amount</th>
                                    <th className="border-0" style={{ backgroundColor: "#25473C", color: "#fff" }}>Purpose</th>
                                    <th className="border-0" style={{ backgroundColor: "#25473C", color: "#fff" }}>Date</th>
                                    <th className="border-0 text-center" style={{ backgroundColor: "#25473C", color: "#fff" }}>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {donations.map((donate, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="rounded-circle bg-success-subtle text-success fw-bold d-flex justify-content-center align-items-center me-3"
                                                    style={{
                                                        width: "45px",
                                                        height: "45px"
                                                    }}
                                                >
                                                    {donate.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <div className="fw-semibold">
                                                        {donate.name}
                                                    </div>
                                                    <small className="text-muted">
                                                        Donor
                                                    </small>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="fw-bold text-success">
                                            {donate.amount}
                                        </td>

                                        <td>
                                            <span className="badge bg-light text-dark border">
                                                {donate.purpose}
                                            </span>
                                        </td>

                                        <td className="text-muted">
                                            {donate.date}
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`badge rounded-pill px-3 py-2 bg-${donate.color}-subtle text-${donate.color}`}
                                            >
                                                {donate.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
