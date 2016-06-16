//check that userId specifided owns the documents
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}