import './dashboard.css';

const recentActivity = [
    { id: 1, text: 'New donation of ₹5,000 received', time: '10 mins ago', color: 'success', icon: 'bi-cash-coin' },
    { id: 2, text: 'Health Camp event scheduled for Aug 15', time: '2 hours ago', color: 'primary', icon: 'bi-calendar-event' },
    { id: 3, text: 'Rahul Sharma applied to volunteer', time: '5 hours ago', color: 'warning', icon: 'bi-person-plus' },
    { id: 4, text: 'Monthly Impact Report published', time: '1 day ago', color: 'info', icon: 'bi-file-earmark-bar-graph' },
];

const dashboardCards = [
    {
        title: "Total Donations (This Week)",
        amount: "₹19,550",
        icon: "bi-cash-stack",
        growth: "12% vs last week",
        growthIcon: "bi-arrow-up-short",
        textColor: "success",
        iconColor: "success",
        bgColor: "bg-success-subtle",
    },
    {
        title: "Active Volunteers",
        amount: "142",
        icon: "bi-people",
        growth: "Stable this month",
        growthIcon: "bi-dash",
        textColor: "danger",
        iconColor: "danger",
        bgColor: "bg-danger-subtle",
    },
    {
        title: "Pending Applications",
        amount: "19",
        icon: "bi-file-earmark-person",
        growth: "Requires attention",
        growthIcon: "bi-exclamation-circle",
        textColor: "warning",
        iconColor: "warning",
        bgColor: "bg-warning-subtle",
    }
];

const quickActions = [
    {
        title: "New Event",
        icon: "bi-calendar-plus",
        action: () => { /* Navigate to New Event Form */ }
    },
    {
        title: "Publish News",
        icon: "bi-newspaper",
        action: () => { /* Navigate to Publish News Form */ }
    },
    {
        title: "Manage Volunteers",
        icon: "bi-people",
        action: () => { /* Navigate to Volunteer Management */ }
    },
    {
        title: "Generate Reports",
        icon: "bi-graph-up",
        action: () => { /* Navigate to Reports Section */ }
    }
]

const Dashboard = () => {
    return (
        <div className="dashboard-container p-4">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Welcome back, Admin</h1>
                    <p className="dashboard-subtitle">Here is what's happening with Banphool today.</p>
                </div>
            </header>
            <div className="d-flex justify-content-end mb-4">
                <div className="bg-light rounded-3 px-3 py-2 d-inline-flex align-items-center">
                    <i className="bi bi-calendar3 me-2"></i>
                    <span>
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="col-md-12">
                <div className="row">
                    {dashboardCards.map((card, index) =>
                        <div className="col-md-6 col-lg-4 mb-4" key={index}>
                            <div className="card border-0 shadow-lg rounded-4">
                                <div className="card-body m-2">
                                    <span style={{ letterSpacing: 0.5, fontSize: 15 }} className="fw-semibold text-muted text-uppercase" >{card.title}</span>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <h2 style={{ lineHeight: 1 }} className="fs-16 fw-bold">{card.amount}</h2>
                                        <div className={`${card.bgColor} fs-4 p-2 rounded-3 px-3`}>
                                            <i className={`${card.icon} fs-4 text-${card.textColor}`}></i>
                                        </div>
                                    </div>
                                    <p className={`mt-2 mb-0 text-${card.textColor}`}>
                                        <i className={card.growthIcon}></i> {card.growth}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-12">
                <div className="row">
                    <div className="col-md-7 mb-4 d-flex">
                        <div className="card border-0 shadow-lg rounded-4 w-100">
                            <div className="card-body m-2">
                                <p className="card-title fw-bold fs-5">Recent Activity</p>
                                <div className="border-bottom"></div>
                                {recentActivity.map((card, index) =>
                                    <div className={`card border-0 mt-3 shadow-sm rounded-4 border-start border-4 border-${card.color} bg-${card.color}-subtle`} key={index}>
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto m-2">
                                                    <div className={`bg-${card.color}-subtle p-2 rounded-3 px-3`}>
                                                        <i className={`${card.icon} fs-4 text-${card.color}`}></i>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <p className="fw-semibold mb-1 fs-5">
                                                        {card.text}
                                                    </p>
                                                    <p className="mb-0 text-muted">
                                                        {card.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-4 d-flex">
                        <div className="card border-0 shadow-lg rounded-4 w-100">
                            <div className="card-body m-2">
                                <p className="card-title fw-bold fs-5">Quick Actions</p>
                                <div className="border-bottom"></div>
                            </div>
                            <div className="row px-3">
                                {quickActions.map((card, index) =>
                                    <div className="col-md-6 mb-3" key={index}>
                                        <div className="card quick-action-card border-0 shadow-sm rounded-4 m-3 p-3 text-center">
                                            <i className={`${card.icon} quick-action-icon fs-4 text-black`}></i>
                                            <p className="fw-semibold text-muted mt-2 mb-0 fs-6">{card.title}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="card-body m-2 mt-auto">
                                <div className="border-top"></div>
                                <p className="fw-semibold mt-3 mb-1">Need Help?</p>
                                <p className="text-muted mb-0">Access the admin guide or contact support for assistance with the dashboard.</p>
                                <button className="btn btn-success mt-2">
                                    Documentation <i className="bi bi-box-arrow-up-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
