let userRole = "Employee";

if (userRole === "Employee") {
console.log("You are authorized to access Dietary Services.");

} else if (userRole === "Enrolled Member") {
console.log("You are authorized to access Dietary Services and one-on-one interaction with a dietician.");

} else if (userRole === "Subscriber") {
console.log("You have partial access to Dietary Services.");

} else if (userRole === "Non-Subscriber") {
console.log("Please enroll or subscribe first to access Dietary Services.");

} else {
console.log("Invalid user role.");
}
