try{
    print("CREATING USER")
    db.createUser(
        {
            user: "readings",
            pwd: "passprova",
            roles: [
                {
                    role: "readWrite",
                    db: "readings"
                }
            ]
        }
    );
    db.createUser(
        {
            user: "reader",
            pwd: "readerpass",
            roles: [
                {
                    role: "read",
                    db: "readings"
                }
            ]
        }
    )
    print("FINISHED CREATING USER");
    print(db.getUsers());
} catch(error){
    print(error)
}
