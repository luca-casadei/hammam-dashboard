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
    print("FINISHED CREATING USER");
    print(db.getUsers());
} catch(error){
    print(error)
}
