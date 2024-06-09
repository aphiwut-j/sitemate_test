from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize issues with sample data
issues = [
    {"id": 1, "title": "Issue 1", "description": "Description of issue 1"},
    {"id": 2, "title": "Issue 2", "description": "Description of issue 2"}
]

@app.route('/issues', methods=['POST'])
def create_issue():
    new_issue = request.json
    new_issue['id'] = max(issue['id'] for issue in issues) + 1  # Assign a unique ID
    issues.append(new_issue)
    return jsonify(new_issue), 201

@app.route('/issues', methods=['GET'])
def get_issues():
    return jsonify(issues)

@app.route('/issues/<int:id>', methods=['PUT'])
def update_issue(id):
    updated_issue = request.json
    for issue in issues:
        if issue['id'] == id:
            issue.update(updated_issue)
            return jsonify(issue)
    return jsonify({"error": "Issue not found"}), 404

@app.route('/issues/<int:id>', methods=['DELETE'])
def delete_issue(id):
    global issues
    issues = [issue for issue in issues if issue['id'] != id]
    return jsonify({"message": "Issue deleted"})

if __name__ == '__main__':
    app.run(debug=True)
