/**
 * The JSON-RPC method corresponding to `PermissionController.revokePermissions`.
 */

const revokePermissions = {
  methodNames: ['wallet_revokePermissions'],
  implementation: revokePermissionsHandler,
  hookNames: {
    revokePermissionsFromSubject: true,
  },
};
export default revokePermissions;

/**
 * @typedef {Record<string, Function>} RevokePermissionsOptions
 * @property {Function} revokePermissionsFromSubject - Revokes the permissions
 * from the current subject.
 */

/**
 *
 * @param {import('json-rpc-engine').JsonRpcRequest<unknown>} _req - The JSON-RPC request object.
 * @param {import('json-rpc-engine').JsonRpcResponse<true>} res - The JSON-RPC response object.
 * @param {Function} _next - The json-rpc-engine 'next' callback.
 * @param {Function} end - The json-rpc-engine 'end' callback.
 * @param {RevokePermissionsOptions} options - The RPC method hooks.
 */
function revokePermissionsHandler(
  req,
  res,
  _next,
  end,
  { revokePermissionsFromSubject },
) {
  const { params } = req;
  if (!Array.isArray(params) || params.length === 0) {
    return end(new Error('Expected a non-empty array of strings.'));
  }

  revokePermissionsFromSubject(params);
  res.result = null;

  return end();
}
